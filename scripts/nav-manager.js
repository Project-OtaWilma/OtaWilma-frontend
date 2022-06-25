const InitializeNavBar = () => {
    const root = document.getElementById('top');
    Array.from(root.getElementsByTagName('button')).forEach(button => {

        button.addEventListener('click', (e) => {
            document.getElementById('loading').style.opacity = 1;
            setTimeout(() => {
                document.location = e.target.id;
            }, 600);
        })
    });
}