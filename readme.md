
# dleco

Economy system for DiscordJS using MongoDB

## New!
Pay method!
```javascript
//Parameters
// first user(user who wants to pay)
//2nd user(user who wants to get money)
//guildId
//amount

//legacy
let user1 = message.author.id;
let user2 = message.mentions.users.first();
let guildId = message.guild.id;
let amount = parseInt(args[0]); // or any amount (let amount = 1000;)
dl.pay(user1, user2, guildId, amount);


//slash
let user1 = interaction.member.id
//here you will need to create a .addUserOption method whitin your command
let user2 = interaction.options.getUser('user')
let guild = interaction.guildId
let amount = interaction.options.getNumber('amount') // or any amount (let amount = 1000;)
dl.pay(user1, user2, guild, amount);

```

## Usage/Examples
Using your DB
```javascript
//declaring dleco
const dl = require('dleco');

dl.connect('URI')
//example on localhost
//dl.connect('mongodb://localhost:27017/')
//example using MongoDB atlas
//dl.connect('mongodb+srv://Username:Password@somethingHere.mongodb.net/database)

```

User balance
```javascript

//getting user balance
//1st parameter takes userID
//2nd parameter takes guildID

const balance = await dl.getBalance(msg.author.id, msg.guild.id) //legacy command
const balance = await dl.getBalance(interaction.member.id, interaction.guildId) // slash command

//returns balance
msg.reply(`Wallet: ${balance.wallet} Bank: ${balance.bank}`) //legacy command
interaction.reply({ content: `Wallet: ${balance.wallet} Bank: ${balance.bank}`, ephemeral: true }) //slash command

```
Add money to user balance
```javascript

//1st parameter takes userID
//2nd parameter takes guildID
//3rd parameter takes the amount

//legacy, 1000 coins
dl.addWallet(msg.author.id, msg.guild.id, 1000);

//slash 1000 coins
dl.addWallet(interaction.member.id, interaction.guildId, 1000);

```

remove money from user balance
```javascript
//1st parameter takes userID
//2nd parameter takes guildID
//3rd parameter takes the amount

//legacy, 1000 coins
dl.removeWallet(msg.author.id, msg.guild.id, 1000);

//slash 1000 coins
dl.removeWallet(interaction.member.id, interaction.guildId, 1000);

```

Add money to user bank
```javascript

//1st parameter takes userID
//2nd parameter takes guildID
//3rd parameter takes the amount

//legacy, 1000 coins
dl.addBank(msg.author.id, msg.guild.id, 1000);

//slash 1000 coins
dl.addBank(interaction.member.id, interaction.guildId, 1000);

```
remove money from user bank
```javascript

//1st parameter takes userID
//2nd parameter takes guildID
//3rd parameter takes the amount

//legacy, 1000 coins
dl.removeBank(msg.author.id, msg.guild.id, 1000);

//slash 1000 coins
dl.removeBank(interaction.member.id, interaction.guildId, 1000);

```

Deposit ( from wallet to bank )
```javascript

//1st parameter takes userID
//2nd parameter takes guildID
//3rd parameter takes the amount

//legacy, 1000 coins
dl.deposit(msg.author.id, msg.guild.id, 1000);

//slash 1000 coins
dl.deposit(interaction.member.id, interaction.guildId, 1000);

```

Withdraw ( from bank to wallet)
```javascript

//1st parameter takes userID
//2nd parameter takes guildID
//3rd parameter takes the amount

//legacy, 1000 coins
dl.withdraw(msg.author.id, msg.guild.id, 1000);

//slash 1000 coins
dl.withdraw(interaction.member.id, interaction.guildId, 1000);

```