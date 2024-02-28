const {Posts, Users} = require('../db/models')

async function createNewPost(userid,title,body){
    const post = await Posts.create({
        title,
        body,
        userid,
    })

    return post
}

/*
showAllPosts({usernaeme:''})
showAllPosts({title:'})
*/

async function findAllPosts(query){
    //todo: Handle query params
    const posts = await Posts.findAll()

    return posts
}

module.exports = {
    createNewPost,
    findAllPosts
}
/*Test Code */

/*
async function task(){
    // console.log(
    //     await createNewPost(
    //         1,
    //         'This is a Simple Post',
    //         'Body of the post goes here'
    //     )
    // ),
    // console.log(
    //     await createNewPost(
    //         2,
    //         'Another Post',
    //         'Some body example here as well'
    //     )
    // )

    const posts = await showAllPosts()
    for(let p of posts){
        console.log(`${p.title}\n${p.body}\n=========\n`)
    }
}

task()

*/

// we not actually store the images in db we only store the url of image