const Post = require('../models/categories');
const Note = require('../models/post');
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
    const categorie = req.body.categorie;
    let note;
    const post = new Post({
        categorie: categorie,
        note: req.noteId
    })
    post.save().then(result => {
        return Note.findById(req.noteId);
    })
    post.save().then(note => {
        note = user;
        user.posts.push(categories);
        return user.save()
    })
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: post,
                note: { _id: note._id, name: note.name }
            });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
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
exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const categorie = req.body.categorie;
    
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('could not find post');
                error.statusCode = 404;
                throw error;
            }
            post.categorie = categorie;
            
            return post.save();
        }).then(result => {
            res.status(200).json({ message: 'Post Updated', post: result })
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
