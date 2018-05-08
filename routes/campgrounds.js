var express     = require("express"),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware"),
    geocoder    = require("geocoder"),
    router      = express.Router();

// INDEX - show all campgrounds
router.get("/", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, page: "campgrounds"});
        }
    });
});

// CREATE - add new campgrounds to database
router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};
        // Create a new campground and save to DB
        Campground.create(newCampground, function (err, newlyCreated) {
            if (err || !newlyCreated) {
                req.flash("error", err.message);
                return res.redirect("/campgrounds");
            } else {
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
            }
        });
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new.ejs");
});

// SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
    // find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err || !foundCampground) {
            console.log(err);
            req.flash("error", "No such campground");
            return res.redirect("/campgrounds");
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    // is user logged in
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found!");
            return res.redirect("/campgrounds");
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership,function (req, res) {
    geocoder.geocode(req.body.location, function (err, data) {
        req.body.campground.lat = data.results[0].geometry.location.lat;
        req.body.campground.lng = data.results[0].geometry.location.lng;
        req.body.campground.location = data.results[0].formatted_address;
        // find and update the correct campground
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
            if (err || !updatedCampground) {
                req.flash("error", err.message);
                return res.redirect("/campgrounds");
            } else {
                // redirect somewhere (show page)
                req.flash("success", "Update successful");
                return res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted");
            return res.redirect("/campgrounds");
        }
    });
});

module.exports = router;