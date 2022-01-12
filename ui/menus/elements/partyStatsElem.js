class partyStatsElem {
    constructor(ctx, party, color, posX, posY, width, height) {
        Object.assign(this, {ctx, party, color, posX, posY, width, height})
    };

    draw() {
        var posX = this.posX;
        const posY = this.posY;
        const width = this.width;
        const offset = 10;

        for (var i = 0; i < this.party.length; i++) {
            var member = this.party[i];
            this.ctx.fillStyle = this.color;
            posX = posX + (i * width) + offset;
            this.ctx.fillRect(posX, posY, 130, 130);

            //draw members name, HP, MP;
            this.drawText(member.name, posX + offset, posY + 40);
            this.drawText(member.stats.hp + '/' + member.stats.maxHP + ' HP',
                posX + offset, posY + 70);
            this.drawText(member.stats.mp + '/' + member.stats.maxMP + ' MP',
                posX + offset, posY + 100);
        }
    };

    drawText(words, x, y) {
        const ctx = this.ctx;
        ctx.font = '30px Reactor7';
        ctx.fillStyle = fontColorBottom;
        ctx.fillText(words, x, y);
        ctx.fillStyle = fontColorTop;
        ctx.fillText(words, x - 5, y - 5);
    }
}