db.createUser({
  user: 'username',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'dev-aptitude-db',
    },
  ],
});
