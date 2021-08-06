
import * as vscode from 'vscode';
import { TestView } from './other/TestView';

export function activate (context: vscode.ExtensionContext) {

    // 1: 这里执行插件被激活时的操作
    console.log('我被激活了!! 桀桀桀桀...');

    // 1: 定义了一个命令(vscode.commands)
    // 2: record-command.helloWorld 可以把它当做id
    let disposable = vscode.commands.registerCommand('record-command.helloWorld', () => {
        // 3: 触发了一个弹出框
        vscode.window.showInformationMessage('2222');
        vscode.window.showInformationMessage('第一个demo弹出信息!');
        vscode.window.showWarningMessage('第一个警告信息');
        vscode.window.showErrorMessage('第一个错误信息!');
    });

    // 4: 把这个对象放入上下文中, 使其生效
    context.subscriptions.push(disposable);


    // new TestView(context);
    const data: any = [
        {
            label: '测试1',
            id: 't1',
        },
        {
            label: '测试2',
            id: 't2',
        },
        {
            label: '测试3',
            id: 't3',
        },
        {
            label: '测试4',
            id: 't4',
        },
        {
            label: '测试5',
            id: 't5',
        }
    ];

    const view = vscode.window.createTreeView('record-command', {
        // showCollapseAll: true,
        // canSelectMany: true,
        treeDataProvider: {
            getTreeItem: (element: any) => {
                // 根据 element.key ，返回对应值
                // console.log(element);
                const item = data.find((ii: any) => ii.id === element.key);
                if (item) {
                    item.command = {
                        title: '点击',
                        command: 'testClick',
                        arguments: [item],
                        resourceUri: vscode.Uri.parse(`/tmp/${item.id}`),
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
    context.subscriptions.push(view);

    context.subscriptions.push(vscode.commands.registerCommand('testClick', (item) => {
        vscode.window.showInformationMessage(item.label);
	}));

}

// 5: 插件被销毁时调用的方法, 比如可以清除一些缓存, 释放一些内存
export function deactivate () {}
