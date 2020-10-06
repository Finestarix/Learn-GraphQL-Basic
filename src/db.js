const users = [
    {
        id: "fcd854e8-3879-4130-b59c-0da5d240c2bf",
        name: "Ignatius Renaldy",
        email: "renaldy001@binus.ac.id",
        age: 20
    }, {
        id: "890e10d3-31d2-47ba-a068-786cd421504b",
        name: "Virgie Cecilia",
        email: "virgie.johan@binus.ac.id",
        age: 18
    }, {
        id: "890e10d3-31d2-47ba-a068-786cd421504c",
        name: "Jethro Otto",
        email: "jethro.otto@binus.ac.id",
        age: 20
    }, {
        id: "890e10d3-31d2-47ba-a068-786cd421504d",
        name: "Benaya Nusantara Edgardo",
        email: "benaya.edgardo@binus.ac.id",
        age: 21
    }
]

let posts = [
    {
        id: "fcd854e8-3879-4130-b59c-0da5d240c2bf",
        title: "GraphQL Introduction",
        body: "GraphQL is ...",
        published: true,
        author: "fcd854e8-3879-4130-b59c-0da5d240c2bf"
    }, {
        id: "fcd854e8-3879-4130-b59c-0da5d240c22f",
        title: "GraphQL Query",
        body: "GraphQL Query is ...",
        published: true,
        author: "890e10d3-31d2-47ba-a068-786cd421504b"
    }, {
        id: "890e10d3-31d2-47ba-a068-786cd421504e",
        title: "GraphQL Mutation",
        body: "GraphQL Mutation is ...",
        published: true,
        author: "890e10d3-31d2-47ba-a068-786cd421504c"
    }, {
        id: "890e10d3-31d2-47ba-a168-786cd421504e",
        title: "GraphQL Subscriptions",
        body: "GraphQL Subscriptions is ...",
        published: true,
        author: "890e10d3-31d2-47ba-a068-786cd421504d"
    }, {
        id: "fcd854e8-3878-4130-b59c-0da5d240c2bf",
        title: "GraphQL Fragment",
        body: "GraphQL Fragment is ...",
        published: false,
        author: "fcd854e8-3879-4130-b59c-0da5d240c2bf"
    }
]

let comments = [
    {
        id: "09f66ac3-3fef-4274-82f9-df8b105a4317",
        text: "Awesome !",
        author: "fcd854e8-3879-4130-b59c-0da5d240c2bf",
        post: "890e10d3-31d2-47ba-a068-786cd42150ab"
    }, {
        id: "88af24ca-b014-4f83-b386-16ec0bf0341f",
        text: "Nice !",
        author: "890e10d3-31d2-47ba-a068-786cd421504c",
        post: "fcd854e8-3879-4130-b59c-0da5d240c22f"
    }, {
        id: "c95d7f48-e26e-4de1-8bfa-9e4456dfb138",
        text: "This worked well for me. Thanks !",
        author: "890e10d3-31d2-47ba-a068-786cd421504b",
        post: "890e10d3-31d2-47ba-a168-786cd421504e"
    }, {
        id: "c215e9c3-4044-49a6-b80c-a248cdd14147",
        text: "This did no work :(",
        author: "890e10d3-31d2-47ba-a068-786cd421504d",
        post: "890e10d3-31d2-47ba-a068-786cd421504e"
    }
]

const db = {
    users,
    posts,
    comments
}

export { db as default }