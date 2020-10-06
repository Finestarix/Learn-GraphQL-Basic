const Query = {
    users(parent, args, {db}, info) {
        return (!args.query) ?
            db.users : db.users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()))
    },
    posts(parent, args, {db}, info) {
        return (!args.query) ?
            db.posts : db.posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
    },
    comments(parent, args, {db}, info) {
        return (!args.query) ?
            db.comments : db.comments.filter((comment) => comment.text.toLowerCase().includes(args.query.toLowerCase()))
    }
}

export {
    Query as default
}