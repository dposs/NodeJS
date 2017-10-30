var Post = require("../../../model/Post");
var PostDAO = require("../../../dao/PostDAO");
var PostService = require("../../../service/PostService");

var postDAO = new PostDAO();
var postService = new PostService().setDAO(postDAO);

var newPost = Post.build({
    subject: "subject",
    content: "content"
});

var updatedPost = Post.build({
    id: 1,
    subject: "subject updated",
    content: "content updated"
});

var post = Post.build({
    id: 1,
    subject: "subject",
    content: "content"
});

var posts = [post];

var updatedCount = 1;
var deletedCount = 1;

var sandbox;

before(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(postDAO, "create").returns(Promise.reject(post));
    sandbox.stub(postDAO, "update").returns(Promise.resolve(updatedPost));
    sandbox.stub(postDAO, "delete").returns(Promise.resolve(deletedCount));
    sandbox.stub(postDAO, "getAll").returns(Promise.resolve(posts));
    sandbox.stub(postDAO, "getById").returns(Promise.resolve(post));
});

after(() => {
    sandbox.restore();
});

describe ("Post Service", () => {
    it ("create() : should create a post", () => {
        return expect(postService.create(newPost)).to.be.fulfilled.and.to.eventually.deep.equal(post);
    });
    it ("update() : should udpate a post", () => {
        return expect(postService.update(updatedPost, post.id)).to.be.fulfilled.and.to.eventually.deep.equal(updatedPost);
    });
    it ("delete() : should delete a post", () => {
        return expect(postService.delete(post.id)).to.be.fulfilled.and.to.eventually.deep.equal(deletedCount);
    });
    it ("getAll() : should return posts", () => {
        return expect(postService.getAll()).to.be.fulfilled.and.to.eventually.deep.equal(posts);
    });
    it ("getById() : should return a post", () => {
        return expect(postService.getById(post.id)).to.be.fulfilled.and.to.eventually.deep.equal(post);
    });
});