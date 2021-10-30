
# dleco

Economy system for DiscordJS using MongoDB



## Usage/Examples
Using your DB
```javascript
//declaring deco
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