import classNames from "classnames";
import { Header, headerLevelT } from "../atoms/header";

// interface listProps {
//     groups: {
//         label: string,
//         list: string[], number[],
//     }[]
// }

interface props {
    groupByKey: string,
    itemsToGroup: {[key: string]: any}[],
    // optional
    className?: any, // K-TODO: look into className type
    groupHeaderLevel?: headerLevelT,
}

export const GroupedList = ({ groupByKey, itemsToGroup, className, groupHeaderLevel}: props) => {
    const groups = itemsToGroup.reduce((acc, obj) => {
        const key = obj[groupByKey];
        const curGroup = acc[key] ?? [];
        return { ...acc, [key]: [...curGroup, obj] };
      }, {});
    return (
        <div className={classNames(`grouped-list-container`, className && className)}>
            GROUPS
        </div>
    )
}