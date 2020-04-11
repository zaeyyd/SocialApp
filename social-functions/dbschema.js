let db = {
    posts: [
        {
            userAT: 'user',
            body: "This is the body",
            createTime: '2020-03-02T11:46:03.018Z',
            likeCount: 4,
            commentCount: 3
        }
    ],
    comments: [
        {
          userAT: 'user',
          postID: 'kdjsfgdksuufhgkdsufky',
          body: 'nice',
          createTime: '2019-03-15T10:59:52.798Z'
        }
      ],

    user: [
        {
        userID: 'gfgdfg',
        email: 'gdgdg',
        AT: 'srgsg',
        createTime: '123',
        imgURL: 'fsfsd',
        bio: 'sfsfdsf',
        website: 'gsrgsfs',
        location: 'gggfs'
        }

    ]
}

const userDetails = {
    // Redux data
    credentials: {
      userID: 'N43KJ5H43KJHREW4J5H3JWMERHB',
      email: 'user@email.com',
      AT: 'user',
      createTime: '2019-03-15T10:59:52.798Z',
      imgURL: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
      bio: 'Hello, my name is user, nice to meet you',
      website: 'https://user.com',
      location: 'Lonodn, UK'
    },
    likes: [
      {
        userAT: 'user',
        postID: 'hh7O5oWfWucVzGbHH2pa'
      },
      {
        userAT: 'user',
        postID: '3IOnFoQexRcofs5OhBXO'
      }
    ]
  };