import * as _ from 'lodash';

export class ClassUtilities {
    public static getClassNameFor = (instance: unknown): string => {
        let name: string;

        const constructor = instance && instance.constructor ? instance.constructor : undefined;
        if (constructor) {
            name = constructor.name;
        }
        if (_.isNil(name)) {
            if (constructor) {
                name = ClassUtilities.getClassNameFromSource(constructor.toString());
            }
        }
        return name;
    };
    /*
        This is necessary because IE does not support the name property
    */
    public static getClassNameFromSource = (source: string): string => {
        if (_.isNil(source)) {
            return undefined;
        }

        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        const matches = source.match(/function +(\S+) *\(/);

        if (!matches || matches.length < 2) {
            return undefined;
        }

        const name = matches[1];
        return name ? name : undefined;
    };
}
