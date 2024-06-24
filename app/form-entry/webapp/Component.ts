import AppComponent from "sap/fe/core/AppComponent";

/**
 * @namespace formentry
 */
export default class Component extends AppComponent {

	public static metadata = {
		manifest: "json"
	};

	/**
	 * Gets the component startup parameters, setting preferredMode to 'create'.
	 *
	 * @returns startup parameters containing preferredMode set to 'create'
	 */
	public getStartupParameters(): Promise<object> {
		return Promise.resolve({
			preferredMode: ["create"]
		});
	}
}