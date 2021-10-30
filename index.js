// EcoNM
// Easy to use economy system using MongoDB
// Copyright (C) 2021 NoName31#6906
// Date: 10/26/2021 10:09 PM
const mongodb = require("mongoose");
const schema = require('./model/currency');

class dEco {
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
                        bank: 0,
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
                    bank: 0,
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
                    bank: 0,
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
                    bank: 0,
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

        const data = await schema.findOne({ user: userId, guild: guildId }).exec();
        if(!data) return 0;
        return data;
    }
}
module.exports = dEco;