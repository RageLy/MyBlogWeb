alter VIEW vw_Querytactics
as
SELECT row_number() over (order by tb.Parent_TacticsID) as myAddId,* FROM (SELECT Tbl_Sys_Tactics.Parent_TacticsID,Tbl_Sys_Tactics.TacticsID,Tbl_Sys_Tactics.TacticsName,a.TacticsName ParentTacticsName,Tbl_Sys_User.UserID,Tbl_Sys_Role.RoleID from Tbl_Sys_User
left join Tbl_Sys_UserRoleRelation on Tbl_Sys_User.UserID=Tbl_Sys_UserRoleRelation.UserID
Left join Tbl_Sys_Role on Tbl_Sys_Role.RoleID=Tbl_Sys_UserRoleRelation.RoleID
left join Tbl_Sys_RoleTactics on Tbl_Sys_RoleTactics.RoleID=Tbl_Sys_Role.RoleID
left join Tbl_Sys_Tactics on Tbl_Sys_Tactics.TacticsID=Tbl_Sys_RoleTactics.TacticsID
left join Tbl_Sys_Tactics a on a.TacticsID=Tbl_Sys_Tactics.Parent_TacticsID) AS tb
go

