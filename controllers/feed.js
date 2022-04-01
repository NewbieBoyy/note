const Post = require('../models/post');
const fs = require('fs')
const path = require('path')
const User = require('../models/user');
exports.getPosts = (req, res, next) => {
    Post.find().then(posts => {
        res.status(200).json({ message: 'Fetched posts succesfully', posts: posts });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const tag = req.body.tag;
    let creator;
    const post = new Post({
        title: title,
        content: content,
        tag : tag,
        creator: req.userId
    })
    post.save().then(result => {
        return User.findById(req.userId);
    }).then(user => {
        creator = user;
        user.posts.push(post);
        return user.save()
        
        
    }).then(result => {
        res.status(201).json({
            message: 'Post created successfully!',
            post: post,
            creator: {_id: creator._id, name:creator.name}
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        } 
        next(err);
    })
    
};
exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('could not find post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Post fetched', post:post})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    
}
exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const title = req.body.title;
    const tag = req.body.tag;
    const content = req.body.content;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('could not find post');
                error.statusCode = 404;
                throw error;
            }
            post.title = title;
            post.content = content;
            post.tag = tag;
            return post.save();
        }).then(result => {
            res.status(200).json({ message: 'Post Updated', post:result})
        })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('could not find post');
                error.statusCode = 404;
                throw error;
            }
           
            return Post.findByIdAndRemove(postId);
        }).then(result => {
            console.log(result);
            res.status(200).json({ message: 'Deleted Post' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.getPost1 = (req, res, next) => {
    const tag = req.body.tag;
    Post.findById(tag)
        .then(post => {
            if (!post) {
                const error = new Error('could not find post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Post fetched', post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}