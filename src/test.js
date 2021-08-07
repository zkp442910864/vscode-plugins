import * as vscode from 'vscode';

// 发布插件地址(没有，要先创建): https://marketplace.visualstudio.com/manage/publishers/zhoukaipeng3?auth_redirect=True
// 发布方式文档： https://code.visualstudio.com/api/working-with-extensions/publishing-extension

// package.json 配置
const package = {
    // https://code.visualstudio.com/api/references/activation-events
    "activationEvents": [],
    // 所有界面相关的配置 都写这
    "contributes": {
        // 所有使用命令
        "commands": [
            {
                "command": "common-command.command",
                "title": "常用命令ccc"
            }
        ],
        // 配置各种菜单
        "menus": {
            // 编辑器右键菜单
            "editor/context": [
                {
                    // 判断条件
                    "when": "ext.command.showRightMenu",
                    // 执行命令
                    "command": "common-command.command",
                    // 所属组别， @1 组内顺序
                    "group": "navigation@1"
                }
            ],
            // 编辑器标题菜单栏
            "editor/title": [
                {
                    "when": "ext.command.showTopEditorTitle",
                    "command": "common-command.command",
                    "group": "navigation"
                }
            ]
        },
        // 侧边活动栏
        "viewsContainers": {
			"activitybar": [
                // 活动栏内容
				{
					"id": "commonCommand",
					"title": "记录命令",
					"icon": "public/images/bookmark-activity-bar.svg"
				}
			]
		},
        // 活动栏展示内容
        "views": {
            // 栏目1，栏目2，栏目3...
            "commonCommand": [
                {
                    // 活动栏内，栏目1，id 用来绑定对应数据
                    "id": "common-command",
                    // 栏目1 的名称
                    "name": "Dependencies"
                }
            ]
        },
        // 不太清楚 https://code.visualstudio.com/api/references/contribution-points#contributes.viewsWelcome
        "viewsWelcome": [
            {
                "view": "scm",
                "contents": "[新增命令](command:common-command.command)",
                "when": "true"
            }
        ],
        // 配置内容（通过 setting.json 进行设置） https://code.visualstudio.com/api/references/contribution-points#contributes.configuration
        "configuration": {
            "title": "CommonCommand",
            "properties": {
                "common-command.showTopEditorTitle": {
					"scope": "resource",
					"type": "boolean",
					"default": false,
					"description": "vscode 重启生效，开启顶部菜单栏"
				},
                "common-command.showRightMenu": {
					"scope": "resource",
					"type": "boolean",
					"default": false,
					"description": "vscode 重启生效，开启顶右键菜单项"
				},
                "common-command.commonCommandData": {
                    "scope": "resource",
                    "type": "array",
                    "description": "vscode 重启生效，配置命令数据 {label: string, value: string}[]"
                }
            }
        }
    },
};

// 注册命令，以及执行内容
// vscode.commands.registerCommand

// 执行命令(command)
// vscode.commands.executeCommand

// 这个可以设置参数，在 package.json 中使用
// vscode.commands.executeCommand('setContext', 'ext.command.showTopEditorTitle', !!config.get('showTopEditorTitle'));

// 获取配置内容数据(对应这里 contributes.configuration)
// vscode.workspace.getConfiguration('common-command')

// 创建一个弹窗选择列表
// vscode.window.showQuickPick
