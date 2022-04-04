export const configuration = () => ({
  env: process.env.NODE_ENV,
  name: process.env.NAME,
  port: parseInt(<string>process.env.PORT, 10),
  tribe: {
    inputs: {
      post: 'aJq6OaiXsqIPurG',
      comment: 'yguLYcKsXpUsUOr',
    },
    spaces: {
      parking: 'jqtRx3yabOzE',
      cooking: '9ZloVcl2DBon'
    },
    memberId: 'oxCyrNIzXa',
    networkId: 'UxWoqr7onj',
    clientId: '40d216e5-31611ab49e3e',
    clientSecret: '5eaca47a1b7a4472a7357a047944c3e8',
    graphqlUrl: 'https://app.tribe.so/graphql',
    // eslint-disable-next-line max-len
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im94Q3lyTkl6WGEiLCJleHRlcm5hbEFjdG9ySWQiOiJBUFA6OkEyRU80NW5KRXpZQiIsIm5ldHdvcmtJZCI6IlV4V29xcjdvbmoiLCJ0b2tlblR5cGUiOiJMSU1JVEVEIiwiZW50aXR5SWQiOiJVeFdvcXI3b25qIiwicGVybWlzc2lvbkNvbnRleHQiOiJORVRXT1JLIiwicGVybWlzc2lvbnMiOlsiKiJdLCJpYXQiOjE2NDg4NDk0NDAsImV4cCI6MTY1MTQ0MTQ0MH0.efJXhZwAoVqDcoYoC5qoY-rpEk3dgQLHIHSrZuN4gE4',
    signature: process.env.TRIBE_SIGNATURE || '19e9f0c8b7084eab8308d1e6138bcdba',
  },
  mongodb: {
    uri:
            process.env.MONGODB_URL || 'mongodb://root:123password@localhost/admin',
  },
});
