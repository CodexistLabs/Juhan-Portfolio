document.addEventListener('DOMContentLoaded', () => {
    function toggleMenu(button) {
        const menuItem = button.closest('.menu-item');
        const wasExpanded = menuItem.classList.contains('expanded');

        // Close other menus
        document.querySelectorAll('.menu-item').forEach(item => {
            const btn = item.querySelector('.menu-button');
            if (item !== menuItem) {
                item.classList.remove('expanded');
                if (btn) {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Toggle current menu
        if (wasExpanded) {
            menuItem.classList.remove('expanded');
            button.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
        } else {
            menuItem.classList.add('expanded');
            button.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    }

    // Attach event listeners to buttons
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', function() {
            toggleMenu(this);
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.bottom-left-menu')) {
                document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('expanded');
                const btn = item.querySelector('.menu-button');
                if (btn) {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});
