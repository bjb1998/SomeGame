class Animation {
    constructor(sheet, xStart, yStart, width, height, frameCount, duration) {
        Object.assign(this, { sheet, xStart, yStart, width, height, frameCount, duration });
        this.elapsedTime = 0;
        this.totalTime = frameCount * duration;

    };

    draw(ctx, x, y, scale) {
        this.elapsedTime += animTimer.tick();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        ctx.clearRect(x, y, this.width * scale, this.height * scale);
        const frame = this.currentFrame();
        ctx.drawImage(this.sheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width * scale, this.height * scale);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.duration);
    };

    done() { return (this.elapsedTime >= this.totaltime); }
};