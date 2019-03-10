import {E} from "js-vextensions";

//import {AddGlobalStyle} from "react-vextensions";

export var styles = {
	// fixes that height:100% doesn't work in safari, when in flex container
	fillParent_abs: {position: "absolute", left: 0, right: 0, top: 0, bottom: 0},
};
export var colors = {
	//navBarBoxShadow: "rgba(70,70,70,.5) 0px 0px 150px",
	//navBarBoxShadow: "rgba(100,100,100,1) 0px 0px 3px",
	navBarBoxShadow: "rgba(100, 100, 100, .3) 0px 0px 3px, rgba(70,70,70,.5) 0px 0px 150px",
};

/*AddGlobalStyle(`
.VMenu > div:first-child { border-top: initial !important; }
`);*/

declare global { function ES(...styles): any; } G({ES});
// same as E(...), except applies extra things for style-objects
function ES(...styles) {
	let result = E(...styles);

	// for firefox; prevents {flex: 1} from setting {minWidth: "auto"}
	if (result.flex) {
		if (result.minWidth == null) result.minWidth = 0;
		if (result.minHeight == null) result.minHeight = 0;
	}

	return result;
}