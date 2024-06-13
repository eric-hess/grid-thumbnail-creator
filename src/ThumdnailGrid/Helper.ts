export const createGridThumbnail = (
    videoObjectUrl: string, 
    columns: number, 
    rows: number,
    height: number,
    width: number,
    withFrameTime: boolean = true
): Promise<string> => {
    return new Promise<string>((resolve) => {
        const video = document.createElement('video');
        video.style.display = 'none';
        video.muted = true;
        video.src = videoObjectUrl;
        video.onloadeddata = () => {
            const canvas = document.createElement('canvas');
            canvas.height = height;
            canvas.width = width;
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            const framesToCapture = columns * rows;
            const frameWidth = canvas.width / columns;
            const frameHeight = canvas.height / rows;
            let framesCaptured = 0;

            const formatTime = (time: number): string => {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
            };

            const captureFrames = () => {
                video.currentTime = 0;
                video.play();

                video.addEventListener('seeked', function handler() {
                    if (framesCaptured < framesToCapture && ctx) {
                        const x = (framesCaptured % columns) * frameWidth;
                        const y = Math.floor(framesCaptured / columns) * frameHeight;

                        ctx.drawImage(video, x, y, frameWidth, frameHeight);
                        
                        if (withFrameTime) {
                            const currentTime = formatTime(video.currentTime);
                            ctx.font = '16px Arial';
                            
                            ctx.lineWidth = 4;
                            ctx.strokeStyle = 'black';
                            ctx.strokeText(currentTime, x + frameWidth - 50, y + 20);

                            ctx.fillStyle = 'white';
                            ctx.fillText(currentTime, x + frameWidth - 50, y + 20);
                        }

                        framesCaptured++;
                        video.currentTime += video.duration / framesToCapture;

                        if (framesCaptured < framesToCapture) {
                            video.addEventListener('seeked', handler, { once: true });
                        } else {
                            video.pause();
                            resolve(canvas.toDataURL());
                        }
                    }
                }, { once: true });
            };

            captureFrames();
        };
    });
};
