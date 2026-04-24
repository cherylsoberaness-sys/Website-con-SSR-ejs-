

export async function homePageController (req, res, next) {
    res.render('homepage.html', {
        title: 'Nodepop'
    });
}