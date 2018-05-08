var express     = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware"),
    router      = express.Router({mergeParams: true});

// Comments New
router.get("/new", middleware.isLoggedIn, function (req, res) {
    // find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err || !campground) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/campground");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments Create
router.post("/", middleware.isLoggedIn, function (req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            req.flash("error", "Something went wrong");
            return res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground show page
                    req.flash("success", "Successfully added comment");
                    return res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// COMMENT EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment edited");
            return res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            return res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;