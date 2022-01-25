class Animation {
    constructor(sheet, xStart, yStart, width, height, frameCount, duration, scale) {
        Object.assign(this, { sheet, xStart, yStart, width, height, frameCount, duration, scale });
        this.elapsedTime = 0;
        this.totalTime = frameCount * duration;

    };

    draw(ctx, x, y) {
        this.elapsedTime += animTimer.tick();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        ctx.clearRect(x, y, this.width * this.scale, this.height * this.scale);
        const frame = this.currentFrame();
        ctx.drawImage(this.sheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width * this.scale, this.height * this.scale);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.duration);
    };

    done() { return (this.elapsedTime >= this.totaltime); }
};