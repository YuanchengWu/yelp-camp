var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel augue eu nulla efficitur vestibulum. Suspendisse ultricies metus lacus, ac laoreet dolor tempor non. Integer rutrum erat vel diam varius ultricies. Aenean id interdum tellus, nec egestas justo. Mauris a dolor erat. Sed ut tempus sem. Nullam dignissim ligula et est consequat porta. Praesent ornare mauris quam."
    },
    {
        name: "Desert Mesa",
        image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
        description: "Cras efficitur aliquam ante id condimentum. Donec lobortis, metus non auctor vulputate, nibh magna convallis nisi, id consequat velit justo quis mauris. Suspendisse potenti. Vestibulum cursus eros ligula, et tristique ligula hendrerit quis. Quisque auctor, sem eget condimentum gravida, metus turpis convallis enim, et pretium tellus sem at turpis. Curabitur a eros ut mi feugiat aliquam sed eu nisi. Suspendisse potenti. Fusce fringilla, odio eget sodales vulputate, diam justo dictum massa, a lobortis lectus arcu eget nunc. Suspendisse suscipit ut lectus ac vulputate. Suspendisse potenti. Aenean aliquam purus sit amet augue tristique luctus. Vivamus id lobortis ex, non venenatis arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ex erat, vehicula venenatis bibendum vitae, lacinia id urna. Nunc consectetur velit sit amet elementum imperdiet."
    },
    {
        name: "Canyon Floor",
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Nulla facilisi. Mauris ullamcorper blandit lobortis. Mauris augue neque, tempor ut euismod vel, efficitur quis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla fermentum egestas vestibulum. Aliquam libero nunc, bibendum ut mi nec, suscipit imperdiet augue. Nunc gravida imperdiet nulla, non volutpat nisl luctus eu. Sed scelerisque odio lobortis lectus commodo rutrum. Proin sollicitudin nisl nec quam dictum commodo. Donec sit amet rutrum lectus."
    }
];

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else
            console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground!");
                    // add a few comments
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;