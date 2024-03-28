## Component

| From                                 | Container                     | To                     | Status | Desc                          |
|--------------------------------------|-------------------------------|------------------------|--------|-------------------------------|
| Background                           |                               | view                   | ✔      | project background            |
| Board                                | BoardContainer                | page/ui-project-board  | ✔      | board viewer                  | 
| BoardActions                         | BoardActionsContainer         | page/ui-project-board  | ✔      | board toolbar action          |
| BoardMembershipPermissionsSelectStep |                               | page/ui-project-board  | ✔      | board membership selection    |
| BoardMembershipsStep                 |                               | page/ui-project-board  | ✔      | card membership popup         |
| Boards                               | BoardsContainer               | view                   | ✔      | project board tab             |
| Card                                 | CardContainer                 | view                   | ✔      | board card                    |
| CardModal                            | CardModalContainer            | page/ui-project-board  | ✔      | dialog card viewer            |
| CardMoveStep                         |                               | view                   | ✔      | card move step                |
| Core                                 | CoreContainer                 | -                      | ✔      |                               |
| DeleteStep                           |                               | view                   | ✔      | dialog delete question        |
| DueDate                              |                               | view                   | ✔      | card dueDate                  |
| DueDateEditStep                      |                               | view                   | ✔      | card dueDate edit step        |
| Fixed                                | FixedContainer                | -                      | ✔      | project, board, card header   |
| Header                               | HeaderContainer               | page/base-auth         | ✔      | auth toolbar                  |
| Label                                |                               | view                   | ✔      | board label                   |
| LabelsStep                           |                               | view                   | ✔      | board label step              |
| List                                 | ListContainer                 | page/ui-project-board  | ✔      | board list view               |
| Login                                | LoginContainer                |                        | ✔      |                               |
| Memberships                          |                               | view                   | ✔      | avatar membership component   |
| Project                              | ProjectContainer              | view                   | ✔      | board toolbar container       |
| ProjectAddModal                      | ProjectAddModalContainer      | page/ui-project-list   | ✔      | dialog create new project     |
| Projects                             | ProjectsContainer             | page/ui-project-list   | ✔      | list of projects              |
| ProjectSettingsModal                 | ProjectSettingsModalContainer | view                   | ✔      | dialog project settings       |
| Static                               | StaticContainer               | -                      | ✔      | project, board, card view     |
| Stopwatch                            |                               | view                   | ✔      | card stop watch               |
| StopwatchEditStep                    |                               | view                   | ✔      | card stop watch edit step     |
| User                                 |                               | view                   | ✔      | user name + avatar view       |
| UserAddStep                          | UserAddStepContainer          | view                   | ✔      | dialog members create         |
| UserEmailEditStep                    |                               | view                   | ✔      | dialog members edit email     |
| UserInformationEdit                  |                               | view                   | ✔      | dialog members edit user info |
| UserPasswordEditStep                 |                               | view                   | ✔      | dialog members edit password  |
| UserSettingsModal                    | UserSettingsModalContainer    | view                   | ✔      | dialog user settings          |
| UsersModal                           | UsersModalContainer           | view                   | ✔      | dialog project members        |
| UserStep                             |                               | page/base-auth         | ✔      | toolbar user menu             |
| UserUsernameEditStep                 |                               | view                   | ✔      | dialog members edit username  |

# QTrack client

scp -r -P 23 build/* waviv@222.54.250.85:/var/www/html/qtrack
