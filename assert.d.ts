export function IN_DEVELOPMENT_ONLY(fn :() => void): void;

export function ASSERT(cond :any, msg? :string): void;
export function ASSERT_NOT_REACHED(): void;
export function ASSERT_IS_INT(v :any, msg? :string): void;
export function ASSERT_IS_NON_NEGATIVE_INT(v :any, msg? :string): void;
export function ASSERT_IS_POSITIVE_INT(v :any, msg? :string): void;
export function ASSERT_IS_ARRAY(v :any, msg? :string): void;
export function ASSERT_IS_FUNC(v :any, msg? :string): void;
export function ASSERT_IS_STRING(v :any, msg? :string): void;
export function ASSERT_IS_UNDEF(v :any, msg? :string): void;
export function ASSERT_IS_OBJ(v :any, msg? :string): void;
export function ASSERT_IS_NUM(v :any, msg? :string): void;
export function ASSERT_IS_CTOR(v :any, msg? :string): void;

export function is_int(v :any): boolean;
export function is_non_negative_int(v :any): boolean;
export function is_positive_int(v :any): boolean;
export function is_array(v :any): boolean;
export function is_func(v :any): boolean;
export function is_string(v :any): boolean;
export function is_undef(v :any): boolean;
export function is_obj(v :any): boolean;
export function is_num(v :any): boolean;
export function is_ctor(v :any): boolean;
export function is_typed_array(v :any): boolean;
