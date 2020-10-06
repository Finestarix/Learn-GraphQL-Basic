const Subscription = {
    comment: {
        subscribe(parent, args, {db, pubsub}, info) {
            const post = db.posts.find((post) => post.id === args.postID && post.published)
            if (!post)
                throw new Error('Post Not Found !')

            return pubsub.asyncIterator(`comment ${args.postID}`)
        }
    },
    post: {
       subscribe(parent, args, {pubsub}, info) {
            return pubsub.asyncIterator('post');
       }
    }
}

export {Subscription as default}