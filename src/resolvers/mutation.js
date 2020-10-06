import {v4 as uuid} from "uuid";

const Mutation = {
    createUser(parent, args, {db}, info) {
        const nameTaken = db.users.some((user) => user.email === args.data.email)
        if (nameTaken)
            throw new Error('Email Taken !')

        const newUser = {
            id: uuid(),
            ...args.data
        }
        db.users.push(newUser);

        return newUser;
    },
    updateUser(parent, args, {db}, info) {
        const user = db.users.find((user) => user.id === args.id)
        if (!user)
            throw new Error('User Not Exist !')

        if (typeof args.data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === args.data.email)
            if (emailTaken)
                throw new Error('Email Taken !')

            user.email = args.data.email
        }

        if (typeof args.data.name === 'string')
            user.name = args.data.name

        if (typeof args.data.age !== 'undefined')
            user.age = args.data.age

        return user
    },
    deleteUser(parent, args, {db}, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)
        if (userIndex === -1)
            throw new Error('User Not Exist !')

        const deletedUser = db.users.splice(userIndex, 1);

        db.posts = db.posts.filter((post) => {
            const postMatch = post.author === args.id
            if (postMatch)
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            return !postMatch
        })
        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUser[0];
    },
    createPost(parent, args, {db, pubsub}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        if (!userExists)
            throw new Error('User Not Exist !')

        const newPost = {
            id: uuid(),
            ...args.data
        }
        db.posts.push(newPost)

        pubsub.publish('post', {
            post: {
                mutation: "CREATED",
                data: newPost
            }
        })

        return newPost
    },
    updatePost(parent, args, {db, pubsub}, info) {
        const post = db.posts.find((post) => post.id === args.id)
        const originalPost = {...post}

        if (!post)
            throw new Error('Post Not Exist !')

        if (typeof args.data.title === 'string')
            post.title = args.data.title

        if (typeof args.data.body === 'string')
            post.body = args.data.body

        if (typeof args.data.published === 'boolean') {
            post.published = args.data.published

            if (originalPost.published && !post.published)
                pubsub.publish('post', {
                    post: {
                        mutation: "DELETED",
                        data: originalPost
                    }
                })

            else if (!originalPost.published && post.published)
                pubsub.publish('post', {
                    post: {
                        mutation: "CREATED",
                        data: post
                    }
                })

        } else if (post.published)
            pubsub.publish('post', {
                post: {
                    mutation: "UPDATED",
                    data: post
                }
            })

        return post
    },
    deletePost(parent, args, {db, pubsub}, info) {
        const postIndex = db.posts.findIndex((post) => post.id === args.id)
        if (postIndex === -1)
            throw new Error('Post Not Exist !')

        const [deletedPost] = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter((comment) => comment.post !== args.id)

        if (deletedPost.published) {
            pubsub.publish('post', {
                post: {
                    mutation: "DELETED",
                    data: deletedPost
                }
            })
        }

        return deletedPost
    },
    createComment(parent, args, {db, pubsub}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published)
        if (!userExists || !postExists)
            throw new Error('User and Post Not Found !')

        const newComment = {
            id: uuid(),
            ...args.data
        }
        db.comments.push(newComment)

        pubsub.publish(`comment ${args.data.post}`, {
            comment: {
                mutation: "CREATED",
                data: newComment
            }
        })

        return newComment
    },
    updateComment(parent, args, {db, pubsub}, info) {
        const comment = db.comments.find((comment) => comment.id === args.id)
        if (!comment)
            throw new Error('Comment Not Exist !')

        if (typeof args.data.text === 'string')
            comment.text = args.data.text

        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: "UPDATED",
                data: comment
            }
        })

        return comment
    },
    deleteComment(parent, args, {db, pubsub}, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)
        if (commentIndex === -1)
            throw new Error('Comment Not Found !')

        const [deletedComment] = db.comments.splice(commentIndex, 1)

        pubsub.publish(`comment ${deletedComment.post}`, {
            comment: {
                mutation: "DELETED",
                data: deletedComment
            }
        })

        return deletedComment;
    }
}

export {
    Mutation as default
}