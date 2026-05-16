package core

type UuidGeneratorApi2Error struct {
	IsUuidGeneratorApi2Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUuidGeneratorApi2Error(code string, msg string, ctx *Context) *UuidGeneratorApi2Error {
	return &UuidGeneratorApi2Error{
		IsUuidGeneratorApi2Error: true,
		Sdk:              "UuidGeneratorApi2",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UuidGeneratorApi2Error) Error() string {
	return e.Msg
}
