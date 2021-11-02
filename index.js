// EcoNM
// Easy to use economy system using MongoDB
// Copyright (C) 2021 NoName31#6906
// Date: 10/26/2021 10:09 PM
const mongodb = require("mongoose");
const schema = require('./model/currency');

class dlEco {
    static async connect(uri) {
        if(!uri) throw new typeError("[EcoNM] - Invalid URI");
        try {
            await mongodb.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => console.log("[EcoNM] - Connected to database"));
        } catch(err) {
            throw new Error(err);
        }
    }

    static async addWallet(userId, guildId, amount){    
        if(!userId) return new Error("Invalid userId");
        if(!guildId) return new Error("Invalid guildId");
        if(!amount) return new Error("Invalid amount");
        if(isNaN(amount)) return new Error("Invalid amount");
        if(amount < 0) return new Error("Invalid amount");
        
            schema.findOne({ user: userId, guild: guildId }, (err, res) => {
                if(err) throw new Error(err);
                if(!res){
                    const newWallet = new schema({
                        user: userId,
                        guild: guildId,
                        bank: 0,
                        wallet: parseInt(amount)
                    });
                    newWallet.save();
                } else {
                    res.wallet += parseInt(amount);
                    res.save();
                }
            });      
    }

    static async removeWallet(userId, guildId, amount){    
        if(!userId) return new Error("Invalid userId");
        if(!guildId) return new Error("Invalid guildId");
        if(!amount) return new Error("Invalid amount");
        if(isNaN(amount)) return new Error("Invalid amount");
        if(amount < 0) return new Error("Invalid amount");
        
            schema.findOne({ user: userId, guild: guildId }, (err, res) => {
                if(err) throw new Error(err);
                if(!res){
                    const newWallet = new schema({
                        user: userId,
                        guild: guildId,
                        bank: 50,
                        wallet: 0
                    });
                    newWallet.save();
                } else {
                    res.wallet -= parseInt(amount);
                    res.save();
                }
            });      
    }

    static async addBank(userId, guildId, amount){
        if(!userId) return new Error("Invalid userId");
        if(!guildId) return new Error("Invalid guildId");
        if(!amount) return new Error("Invalid amount");
        if(isNaN(amount)) return new Error("Invalid amount");
        if(amount < 0) return new Error("Invalid amount");

        schema.findOne({ user: userId, guild: guildId }, (err, res) => {
            if(err) throw new Error(err);
            if(!res){
                const newWallet = new schema({
                    user: userId,
                    guild: guildId,
                    bank: parseInt(amount),
                    wallet: 0
                });
                newWallet.save();
            } else {
                res.wallet -= parseInt(amount);
                res.save()
            }
        });
    }

    static async removeBank(userId, guildId, amount){
        if(!userId) return new Error("Invalid userId");
        if(!guildId) return new Error("Invalid guildId");
        if(!amount) return new Error("Invalid amount");
        if(isNaN(amount)) return new Error("Invalid amount");
        if(amount < 0) return new Error("Invalid amount");

        schema.findOne({ user: userId, guild: guildId }, (err, res) => {
            if(err) throw new Error(err);
            if(!res){
                const newWallet = new schema({
                    user: userId,
                    guild: guildId,
                    bank: 50,
                    wallet: 0
                });
                newWallet.save();
                return false;
            } else {
                res.bank -= parseInt(amount)
                res.save()
            }
        });
    }

    static async deposit(userId, guildId, amount){
        if(!userId) throw new Error('Invalid user ID');
        if(!guildId) throw new Error('Invalid guild ID');
        if(!amount) throw new Error('Invalid amount');
        if(isNaN(amount)) throw new Error('Invalid amount');
        if(amount < 0) throw new Error('Invalid amount');

        schema.findOne({ user: userId, guild: guildId }, (err, res) => {
            if(err) throw new Error(err);
            if(!res){
                const newWallet = new schema({
                    user: userId,
                    guild: guildId,
                    bank: 50,
                    wallet: 0
                });
                newWallet.save();
            } else {
                res.bank += parseInt(amount)
                res.wallet -= parseInt(amount);
                res.save();
            }
        });
    }

    static async withdraw(userId, guildId, amount){
        if(!userId) throw new Error('Invalid user ID');
        if(!guildId) throw new Error('Invalid guild ID');
        if(!amount) throw new Error('Invalid amount');
        if(isNaN(amount)) throw new Error('Invalid amount');
        if(amount < 0) throw new Error('Invalid amount');

        schema.findOne({ user: userId, guild: guildId }, (err, res) => {
            if(err) throw new Error(err);
            if(!res){
                const newWallet = new schema({
                    user: userId,
                    guild: guildId,
                    bank: 50,
                    wallet: 0
                });
                newWallet.save();
            } else {
                res.wallet += parseInt(amount);
                res.bank -= parseInt(amount);
                res.save();
            }
        });
    }

    static async getBalance(userId, guildId){
        if(!userId) throw new Error('Invalid user ID');
        if(!guildId) throw new Error('Invalid guild ID');

        const data = schema.findOne({ user: userId, guild: guildId }).exec();
        if(!data) return 0;
        return data;
    }

    static async pay(userId, userId2, guildId, amount){
        if(!userId) throw new Error('Invalid user ID');
        if(!guildId) throw new Error('Invalid guild ID');
        if(!amount) throw new Error('Invalid amount');
        if(isNaN(amount)) throw new Error('Invalid amount');
        if(amount < 0) throw new Error('Invalid amount');
        if(!userId2) throw new Error('Invalid user2 ID');

        
        const data = await schema.findOne({ user: userId, guild: guildId }).exec();
        if(!data){
            const newWallet = new schema({
                user: userId,
                guild: guildId,
                bank: 0,
                wallet: 0
            });
            newWallet.save();
            throw new Error('no money');
        }
        if(data){
            data.wallet -= parseInt(amount);
            data.save();
        }
        if(data.wallet < amount) throw new Error('Not enough money');


        const user2 = await schema.findOne({ user: userId2, guild: guildId }).exec();
        if(!user2){
            const newWallet = new schema({
                user: userId2,
                guild: guildId,
                bank: 0,
                wallet: parseInt(amount)
            });
            newWallet.save();
        }
        if(user2){
            user2.wallet += amount;
            user2.save();
        }
    }

    static async rob(userId, userId2, guildId, maxAmount, minAmount){
        if(!userId) throw new Error('Invalid user ID');
        if(!guildId) throw new Error('Invalid guild ID');
        if(!maxAmount) throw new Error('Invalid max amount');
        if(isNaN(maxAmount)) throw new Error('Invalid max amount');
        if(maxAmount < 0) throw new Error('Invalid max amount');
        if(!userId2) throw new Error('Invalid user2 ID');
        const user = await schema.findOne({ user: userId, guild: guildId }).exec();
        const user2 = await schema.findOne({ user: userId2, guild: guildId }).exec();
        if(!user) throw new Error('User1 does not exists');
        if(!user2) throw new Error('User2 does not exists');

        if(user.wallet < minAmount) throw new Error('Not enough money');
        if(user2.wallet < minAmount) throw new Error('Not enough money');
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
        const rndInt = randomIntFromInterval(minAmount, maxAmount);
        const random = Math.floor(Math.random() * 6) + 1;
        if(random > 3){
            user2.wallet -= rndInt;
            user2.save();
            user.wallet += rndInt;
            user.save();
        } else {
            user2.wallet += rndInt;
            user2.save();
            user.wallet -= rndInt;
            user.save();
        }
    }
}
module.exports = dlEco;