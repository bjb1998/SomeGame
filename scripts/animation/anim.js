class Anim {
    constructor(sheet, xStart, yStart, width, height, frameCount, duration, scale, offset) {
        Object.assign(this, { sheet, xStart, yStart, width, height, frameCount, duration, scale, offset});
        this.elapsedTime = 0;
        this.totalTime = frameCount * duration;
        this.timer = new Timer();
    };

    draw(ctx, x, y) {
        this.elapsedTime += this.timer.tick();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        ctx.clearRect(x, y + this.offset, this.width * this.scale, this.height * this.scale);
        const frame = this.currentFrame();
        ctx.drawImage(this.sheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y + this.offset,
            this.width * this.scale, this.height * this.scale);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.duration);
    };

    done() { return (this.elapsedTime >= this.totaltime); }
};