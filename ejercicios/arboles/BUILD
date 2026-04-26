load("@rules_java//java:defs.bzl", "java_library", "java_test")

java_library(
    name = "arboles_lib",
    srcs = ["ArbolBinarioBusqueda.java"],
    visibility = ["//visibility:public"],
)

java_test(
    name = "ArbolBinarioBusquedaTest",
    srcs = ["ArbolBinarioBusquedaTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "arboles.ArbolBinarioBusquedaTest"],
    use_testrunner = False,
    deps = [
        ":arboles_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)
