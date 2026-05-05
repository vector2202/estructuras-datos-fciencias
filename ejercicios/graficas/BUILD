load("@rules_java//java:defs.bzl", "java_library", "java_test")

java_library(
    name = "graficas_lib",
    srcs = ["Grafo.java"],
    visibility = ["//visibility:public"],
)

java_test(
    name = "GrafoTest",
    srcs = ["GrafoTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "graficas.GrafoTest"],
    use_testrunner = False,
    deps = [
        ":graficas_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)
