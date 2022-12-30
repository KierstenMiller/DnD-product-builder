import { makeObservable, observable, } from "mobx"

export interface BuildYourOwnModelInterface {
    dimensions: string,
    stitch: string,
    print: string,
    colorway: string,
    texture: string,
}

 export class BuildYourOwnModel {
    dimensions
    stitch
    print
    colorway
    texture
    constructor({dimensions, stitch, print, colorway, texture}: BuildYourOwnModelInterface) {
        this.dimensions = dimensions;
        this.stitch = stitch;
        this.print = print;
        this.colorway = colorway;
        this.texture = texture;
        makeObservable(this, {
            dimensions: observable,
            stitch: observable,
            print: observable,
            colorway: observable,
            texture: observable,
        })
    }
}