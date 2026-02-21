load("@rules_java//java:defs.bzl", "java_library", "java_test")

java_library(
    name = "listas_lib",
    srcs = ["ListaSimple.java"],
    visibility = ["//visibility:public"],
)

java_test(
    name = "ListTest",
    srcs = ["ListTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "listas.ListTest"],
    use_testrunner = False,
    deps = [
        ":listas_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)

java_test(
    name = "ReverseTest",
    srcs = ["ReverseTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "listas.ReverseTest"],
    use_testrunner = False,
    deps = [
        ":listas_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)
