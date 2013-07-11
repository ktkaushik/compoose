### Compoose ###

To integrate mongoosejs with compound, make changes in the following files :

```
autoload.js
database.js
knock off jugglingdb from package.json
add mongoose.js init config file in /config
```

For seedjs to be compatible with mongoose, change the `package.json` file to 

```json
 "seedjs": "git://github.com/ktkaushik/seedjs.git"
```