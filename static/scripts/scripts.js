function showShowables(id) {
    const showables = document.querySelectorAll('.trig');
    for (let show of showables) {
        if (id == show.id) {
            show.classList.toggle('hidden');
        } else {
            show.classList.add('hidden');
        }
    }
}
       