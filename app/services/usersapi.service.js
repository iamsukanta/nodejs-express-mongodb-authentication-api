const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../configs/jwt.configs.js');

// Import model
User = require('../models/user.js');

module.exports = {
    create: async (req, res) => {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8)
        let existUser = await User.find({ email: req.body.email});
        if(existUser.length < 1) {
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = hashedPassword;
            return user.save()
            .then(function(user) { 
                var token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, config.secret, { expiresIn: '60m' });
                return res.status(200).json({ user: user, token: token, message: "User Successfully Created.",}); 
            }).catch(err => {
                return res.status(400).json({ message: err});
            });    
            
        } else {
            return res.status(400).json({ message: 'Eamil Already Exists'});
        }
        
    },

    update: (req, res) => {
        var id = req.params.id;
        return User.findById(id)
            .exec((err, user) => {
            if (err) { res.status(400).json(err);}
            else {
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = req.body.password;
                user.save()
                .then(function(response) { 
                    res.status(200).json({message: "User successfylly updated.", success: true}) 
                }).catch(err => {
                    res.status(400).json({ message: err});
                });  
            }
        });
    },

    list: (req, res) => {
        return User.find({})
        .sort({created_at: -1})
        .exec((err, user) => {
            if (err) res.status(400).json(err);
            res.status(200).json({data: user, success: true})
        });
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email }, async (err, user) => {
            if (err) return res.status(500).send({ message: "Internal server error"});
            if (!user ) return res.status(400).json({ message: "Email Does Not Exist." });    
            
            var passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(400).send({ auth: false, token: null , message: "Password not matched."})
        
            var token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, config.secret, { expiresIn: '60m' });
        
            res.setHeader("Authorization", token);
            return res.status(200).json({
              message: "Auth Successful"
            });   
        })
    },

    logout: (req, res) => {
        return res.status(200).json({ message: "Logout Successful" });
    },

    refresh: (req, res) => {
        var token = jwt.sign({ 
            _id: req.user._id, 
            email: req.user.email, 
            name: req.user.name },
            config.secret, { expiresIn: '60m' }
        );
        res.setHeader("Authorization", token);
        return res.status(200).json({ auth: true, token: token }); 
    },

    me: (req, res) => {
        var id = req.user._id;
        return User.findById(id)
            .exec((err, user) => {
            if (err) res.status(400).json(err);
            res.status(200).json({data: user, success: true})
        });
    },

    destroy: (req, res) => {
        var id = req.params.id;
        return User.findByIdAndRemove(id)
            .exec((err, sample) => {
            if (err) res.status(400).json(err);
            res.status(200).json({data: {message: 'User successfully deleted'}, success: true})
        });
    }
}
