
import * as vscode from 'vscode';
// import leftShortcuts from './other/leftShortcuts';

export function activate (context: vscode.ExtensionContext) {

    // // 1: 这里执行插件被激活时的操作
    // console.log('我被激活了!! 桀桀桀桀...', context);
    // // 1: 定义了一个命令(vscode.commands)
    // // 2: common-command.helloWorld 可以把它当做id
    // let disposable = vscode.commands.registerCommand('common-command.helloWorld', () => {
    //     // 3: 触发了一个弹出框
    //     vscode.window.showInformationMessage('2222');
    //     vscode.window.showInformationMessage('第一个demo弹出信息!');
    //     vscode.window.showWarningMessage('第一个警告信息');
    //     vscode.window.showErrorMessage('第一个错误信息!');
    // });

    // // 4: 把这个对象放入上下文中, 使其生效
    // context.subscriptions.push(disposable);


    const config = vscode.workspace.getConfiguration('common-command');
    const data: any = config.get('commonCommandData') || [
        {
            label: '重启vscode',
            value: 'workbench.action.reloadWindow'
        }
    ];

    // 设置扩展 when 判断条件
    vscode.commands.executeCommand('setContext', 'ext.command.showTopEditorTitle', !!config.get('showTopEditorTitle'));
    vscode.commands.executeCommand('setContext', 'ext.command.showRightMenu', !!config.get('showRightMenu'));

    // leftShortcuts(context, data);

    data.forEach((item: any) => {
        item.description = item.value;
    });

    // 弹出选择框
    const commonCommand = vscode.commands.registerCommand('common-command.command', () => {
        vscode.window.showQuickPick(data, {matchOnDescription: true}).then((item: any) => {
            // console.log(item);
            vscode.commands.executeCommand(item.value);
        }, (rej) => {
            console.log(rej);
        });
    });
    context.subscriptions.push(commonCommand);
}

// 5: 插件被销毁时调用的方法, 比如可以清除一些缓存, 释放一些内存
export function deactivate () {}
