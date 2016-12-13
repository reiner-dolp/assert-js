interface assert {
    (value :boolean, msg? :string) :void;
    is_int(value :number, range :[number,number], msg? :string) :void;
    is_true(value :boolean, msg? :string) :void;
    is_undefined(val :any, msg? :string) :void;
    is_func(val :any, msg? :string) :void;
    is_numeric(val :any, msg? :string) :void;
    is_num(val :any, msg? :string) :void;
    is_array(val :any, msg? :string) :void;
    is_string(val :any, msg? :string) :void;
    is_str(val :any, msg? :string) :void;
    is_object(val :any, msg? :string) :void;
    is_ctor(self :any, selfname) :void;
    not_reached(msg? :string) :void;
}

//declare module "assert" {
//    export = assert;
//}

declare const assert :assert;
