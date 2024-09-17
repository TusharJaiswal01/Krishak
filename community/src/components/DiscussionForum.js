import React, { useState, useEffect } from 'react';
import DiscussionChat from './DiscussionChat'; // Importing the existing DiscussionChat component

const DiscussionForum = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        articleContent: '',
        image: '',
    });

    const [articles, setArticles] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [activeComment, setActiveComment] = useState(null);
    const [comments, setComments] = useState({});

    useEffect(() => {
        // Load previous articles from local storage
        const savedArticles = JSON.parse(localStorage.getItem('articles')) || [];
        setArticles(savedArticles);
    }, []);

    useEffect(() => {
        // Save articles to local storage
        localStorage.setItem('articles', JSON.stringify(articles));
    }, [articles]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setFormData({
            ...formData,
            image: fileURL,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setArticles([...articles, { ...formData, likes: 0, dislikes: 0, comments: [] }]);
        setFormData({
            name: '',
            email: '',
            articleContent: '',
            image: '',
        });
    };

    const handleChatButtonClick = (index) => {
        setActiveChat(index === activeChat ? null : index);
    };

    const handleCommentButtonClick = (index) => {
        setActiveComment(index === activeComment ? null : index);
    };

    const handleCommentChange = (index, value) => {
        setComments({
            ...comments,
            [index]: value,
        });
    };

    const handleCommentSubmit = (index) => {
        const updatedArticles = [...articles];
        updatedArticles[index].comments = updatedArticles[index].comments || [];
        updatedArticles[index].comments.push(comments[index]);
        setArticles(updatedArticles);
        setComments({
            ...comments,
            [index]: '',
        });
    };

    const handleLike = (index) => {
        const updatedArticles = [...articles];
        updatedArticles[index].likes += 1;
        setArticles(updatedArticles);
    };

    const handleDislike = (index) => {
        const updatedArticles = [...articles];
        updatedArticles[index].dislikes += 1;
        setArticles(updatedArticles);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Submit an Article</h2>

                <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
                    <legend className="text-lg font-semibold text-gray-700">Article Information</legend>
                    <label className="block text-gray-600">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block text-gray-600">
                        Email Address:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block text-gray-600">
                        Article Content:
                        <textarea
                            name="articleContent"
                            value={formData.articleContent}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block text-gray-600">
                        Upload Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-2"
                        />
                    </label>
                    {formData.image && (
                        <img
                            src={formData.image}
                            alt="Article"
                            className="mt-2 max-w-xs"
                        />
                    )}
                </fieldset>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 space-y-4">
                        <div className="relative">
                            <img
                                src={article.image}
                                alt="Article"
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <img
                                src={article.image}
                                alt="Thumbnail"
                                className="absolute bottom-2 right-2 w-24 h-24 object-cover rounded-full border-4 border-white"
                            />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{article.name}</p>
                            <p className="text-sm text-gray-600">{article.email}</p>
                        </div>
                        <p className="text-gray-800">{article.articleContent}</p>
                        <button
                            onClick={() => handleChatButtonClick(index)}
                            className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Chat
                        </button>
                        {activeChat === index && <DiscussionChat />}

                        <button
                            onClick={() => handleCommentButtonClick(index)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Comment
                        </button>
                        {activeComment === index && (
                            <div className="mt-4">
                                <label className="block text-gray-600">
                                    Add a Comment:
                                    <textarea
                                        value={comments[index] || ''}
                                        onChange={(e) => handleCommentChange(index, e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </label>
                                <button
                                    onClick={() => handleCommentSubmit(index)}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Submit Comment
                                </button>

                                {article.comments && article.comments.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold text-gray-800">Comments</h4>
                                        <ul className="list-disc ml-4">
                                            {article.comments.map((comment, i) => (
                                                <li key={i} className="text-gray-600">{comment}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-4 flex items-center space-x-4">
                            <button
                                onClick={() => handleLike(index)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center space-x-2"
                            >
                                <span>Like</span>
                                <span>{article.likes}</span>
                            </button>
                            <button
                                onClick={() => handleDislike(index)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center space-x-2"
                            >
                                <span>Dislike</span>
                                <span>{article.dislikes}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscussionForum;
