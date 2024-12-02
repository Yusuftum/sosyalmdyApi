const Post = require('../models/Post');

//yeni post oluşturma 
exports.createPost = async (req, res) => {
    const { content } = req.body;
    try {
        const post = new Post({ content, author: req.user.id });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//bir gönderiye yorum yapma
exports.commentOnPost = async (req, res) => {
    const { postId, comment } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.comments.push({
            user: req.user.id,
            content: comment
        });

        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//gönderiyi beğenme
exports.likePost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.likes.includes(req.user.id)) {
            return res.status(400).json({ error: 'You already liked this post' });
        }

        post.likes.push(req.user.id);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//tüm gönderileri listeleme
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').populate('comments.user', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
