import { makeObservable, observable, action} from "mobx"

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
            setDimensions: action.bound,
            setStitch: action.bound,
            setPrint: action.bound,
            setColorway: action.bound,
            setTexture: action.bound,
        }) 
    }
    setDimensions = (newDimensions: string) => this.dimensions = newDimensions;
    setStitch = (newStitch: string) => this.stitch = newStitch;
    setPrint = (newPrint: string) => this.print = newPrint;
    setColorway = (newColorway: string) => this.colorway = newColorway;
    setTexture = (newTexture: string) => this.texture = newTexture;
}