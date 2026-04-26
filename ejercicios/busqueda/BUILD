load("@rules_java//java:defs.bzl", "java_library", "java_test")

java_library(
    name = "busqueda_lib",
    srcs = ["BusquedaBinaria.java"],
    visibility = ["//visibility:public"],
)

java_test(
    name = "BusquedaTest",
    srcs = ["BusquedaTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "busqueda.BusquedaTest"],
    use_testrunner = False,
    deps = [
        ":busqueda_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)
