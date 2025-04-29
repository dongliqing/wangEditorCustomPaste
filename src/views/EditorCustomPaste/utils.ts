
type EmptyText = {
    text: ''
}

type ImageStyle = {
    width?: string;
    height?: string;
}
type ImageElement = {
    type: 'image'
    src: string
    alt?: string
    href?: string
    style?: ImageStyle
    children: EmptyText[]
}

const tabMap = {
    section: "paragraph",
    img: "image",
    p: "paragraph",
    div: "paragraph",
}


export function convertToRootJson($) {
    let jsonData: Record<string, any> = {
        type: "paste",
        children: [],
    };
    const children = []; // 初始化子元素数组

    // 遍历body中的所有元素，并将其转换为JSON对象
    $("div[data-w-e-type='paste']").children().each(function () {
        // 递归处理子元素
        children.push(convertToJson($, this)); // 递归调用转换函数
    });
    // 将当前元素的信息添加到jsonData中
    jsonData.children = children;
    return jsonData;
}


// 辅助函数，用于递归转换单个元素为JSON对象（可选，如果需要更复杂的结构）
export function convertToJson($, element) {
    const tagName = $(element).prop('tagName').toLowerCase(); // 获取标签名
    const text = $(element).text().trim(); // 获取文本内容（去除空格）
    const src = $(element).attr('src'); // 获取属性对象（如果有的话）
    const style = $(element).attr('style'); // 获取属性对象（如果有的话）
    const children = []; // 初始化子元素数组

    // 递归处理子元素
    $(element).children().each(function () {
        children.push(convertToJson($, this)); // 递归调用转换函数
    });
    return {
        // type: tabMap[tagName],
        tag: tagName,
        text: children.length > 0 ? '' : text,
        style,
        src,
        children,
    };
}


function getAttr(attrList) {
    const result: Record<string, any> = {};
    attrList.filter(e => ['style', 'src'].includes(e.name))
        .forEach(element => {
            // if(element.name === "style"){
            //     const styleList = element.value.split(";");
            //     result.style = {};
            //     styleList.forEach(e=>{
            //         const [key, value] = e.split(":");
            //         result[element.name][camelCase(key)] = value;
            //     })
            //     return;
            // }
            result[element.name] = element.value;
        });
    return result;
}