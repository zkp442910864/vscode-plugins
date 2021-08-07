
import * as vscode from 'vscode';

export default function (context: vscode.ExtensionContext, data: any) {

    // 设置数据id
    data.forEach((item: any, index: number) => {
        item.id = `eId${index}`;
    });

    // 订阅-资源管理器数据注册(侧边栏数据)
    const view = vscode.window.createTreeView('common-command', {
        treeDataProvider: {
            getTreeItem: (element: any) => {
                // 根据 element.key ，返回对应值
                // console.log(element);
                const item = data.find((ii: any) => ii.id === element.key);
                if (item) {
                    item.label = `${item.label} (${item.value})`;
                    item.command = {
                        title: '点击',
                        command: 'common-command-click',
                        arguments: [item],
                        // resourceUri: vscode.Uri.parse(`/tmp/${item.id}`),
                    };
                }
                return item || {};
            },
            getChildren: (element) => {
                // 先返回 key
                return data.map((ii: any) => ({key: ii.id}));
            },
        }
    });

    // 订阅-注册触发命令
    const commonCommandClick = vscode.commands.registerCommand('common-command-click', (item) => {
        vscode.commands.executeCommand(item.value).then((res) => {
            // vscode.window.showInformationMessage('请在合适的地方，执行该命令');
        }, () => {
            vscode.window.showInformationMessage('请在合适的地方，执行该命令');
        });
	});

    // 订阅后才能生效
    context.subscriptions.push(view);
    context.subscriptions.push(commonCommandClick);
}

