document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-preview-trigger]');
        if (trigger) {
            const id = trigger.dataset.previewTrigger;
            const modal = document.getElementById(id + '-modal');
            if (modal) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
            return;
        }

        const closer = e.target.closest('[data-preview-close]');
        if (closer) {
            const id = closer.dataset.previewClose;
            const modal = document.getElementById(id + '-modal');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
            return;
        }
    });
});
