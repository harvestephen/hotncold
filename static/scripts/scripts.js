function showShowables(id) {
    const showables = document.querySelectorAll('.trig');
    for (let show of showables) {
        if (id == show.id) {
            show.classList.toggle('hiddenss');
        } else {
            show.classList.add('hiddenss');
        }
    }
}
       