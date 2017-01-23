#ifdef UNCHECKED_PRODUCTION_BUILD
#define _CHOOSE_OVERLOAD(_1, _2, _OVERLOAD, ...) _OVERLOAD

#define IN_DEVELOPMENT_ONLY(fn)

#define ASSERT(...) _CHOOSE_OVERLOAD(__VA_ARGS__, ASSERT2,ASSERT1)(__VA_ARGS__)
#define ASSERT1(cond) 
#define ASSERT2(cond, msg) 

#define ASSERT_NOT_REACHED()

#define IS_INT(v) 
#define IS_NON_NEGATIVE_INT(v) 
#define IS_POSITIVE_INT(v) 
#define IS_ARRAY(v)
#define IS_FUNC(v)
#define IS_STRING(v)
#define IS_NUM(v)
#define IS_UNDEF(v)
#define IS_OBJ(v)
#define IS_CTOR(a, b)
#endif
